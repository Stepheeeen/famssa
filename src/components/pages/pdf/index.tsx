import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Download, CreditCard, Search, BookOpen } from "lucide-react";
import { formatCurrency } from "./utils/currencyFormatter";
import { BASE_URL } from "../../../constants";

const PDFLibrary = () => {
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPdf, setSelectedPdf] = useState<any | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Fetch PDFs from API
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/library/all`);
        if (!response.ok) throw new Error("Failed to fetch PDFs");

        const data = await response.json();
        setPdfs(data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPdfs();
  }, []);

  // Filter PDFs based on search
  const filteredPdfs = useMemo(
    () =>
      pdfs.filter(
        (pdf) =>
          pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pdf.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, pdfs]
  );

  const handleDownload = (pdf: any) => {
    if (pdf.isPremium) {
      setSelectedPdf(pdf);
      setShowPremiumModal(true);
    } else {
      window.open(pdf.fileUrl, "_blank");
    }
  };

  const handlePurchase = () => {
    alert(`Purchase successful! Downloading ${selectedPdf.title}...`);
    window.open(selectedPdf.fileUrl, "_blank");
    setShowPremiumModal(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">PDF Library</h1>
        <p className="text-lg text-gray-600">
          Browse and download educational PDFs
        </p>

        <div className="relative mt-4">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search PDFs..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring focus:ring-indigo-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPdfs.map((pdf) => (
          <Card key={pdf._id} className="overflow-hidden shadow-lg border-0">
            <CardHeader>
              <CardTitle>{pdf.title}</CardTitle>
              {pdf.isPremium ? (
                <Badge className="bg-amber-500">Premium</Badge>
              ) : (
                <Badge className="bg-green-500">Free</Badge>
              )}
            </CardHeader>
            <CardContent>
              <CardDescription>{pdf.description}</CardDescription>
              <p className="my-3 text-sm text-gray-500">
                {formatCurrency(pdf?.price) || "Free"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <BookOpen size={16} /> Read
              </Button>
              <Button onClick={() => handleDownload(pdf)}>
                {pdf.isPremium ? (
                  <CreditCard size={16} />
                ) : (
                  <Download size={16} />
                )}
                {pdf.isPremium ? "Buy" : "Download"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Purchase PDF</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Unlock "{selectedPdf?.title}" for just{" "}
            {formatCurrency(selectedPdf?.price)}.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPremiumModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePurchase}>Purchase</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PDFLibrary;
