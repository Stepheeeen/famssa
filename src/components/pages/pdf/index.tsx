import { useState, useMemo } from "react";
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
// import { Label } from "../../ui/label";
import { Download, CreditCard, Search, BookOpen } from "lucide-react";
import { formatCurrency } from "./utils/currencyFormatter";

const PDFLibrary = () => {
  const [pdfs] = useState([
    {
      id: 1,
      title: "Complete React Guide",
      description: "Learn React from the basics to advanced concepts",
      size: "12.5 MB",
      premium: false,
      tags: ["React", "Frontend"],
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      description: "Master modern CSS and animations",
      size: "8.2 MB",
      premium: false,
      tags: ["CSS", "Design"],
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Create beautiful and functional user interfaces",
      size: "15.7 MB",
      premium: true,
      tags: ["Design", "UX"],
    },
    {
      id: 4,
      title: "TailwindCSS Masterclass",
      description: "Build responsive websites with Tailwind",
      size: "10.1 MB",
      premium: false,
      tags: ["CSS", "Tailwind"],
    },
    {
      id: 5,
      title: "JavaScript Performance",
      description: "Optimize your JavaScript applications",
      size: "14.3 MB",
      premium: true,
      tags: ["JavaScript", "Performance"],
    },
    {
      id: 6,
      title: "Next.js Enterprise Patterns",
      description: "Scalable patterns for large applications",
      size: "18.9 MB",
      premium: true,
      tags: ["Next.js", "React"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPdf, setSelectedPdf] = useState<any | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showReadModal, setShowReadModal] = useState(false);

  const filteredPdfs = useMemo(
    () =>
      pdfs.filter(
        (pdf) =>
          pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pdf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pdf.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ),
    [searchTerm, pdfs]
  );

  const handleDownload = (pdf: any) => {
    if (pdf.premium) {
      setSelectedPdf(pdf);
      setShowPremiumModal(true);
    } else {
      alert(`Downloading ${pdf.title}...`);
    }
  };

  const handlePurchase = () => {
    alert(`Purchase successful! Downloading ${selectedPdf.title}...`);
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
          <Card key={pdf.id} className="overflow-hidden shadow-lg border-0">
            <CardHeader>
              <CardTitle>{pdf.title}</CardTitle>
              {pdf.premium ? (
                <Badge className="bg-amber-500">Premium</Badge>
              ) : (
                <Badge className="bg-green-500">Free</Badge>
              )}
            </CardHeader>
            <CardContent>
              <CardDescription>{pdf.description}</CardDescription>
              <p className="text-sm text-gray-500">Size: {pdf.size}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowReadModal(true)}>
                <BookOpen size={16} /> Read
              </Button>
              <Button onClick={() => handleDownload(pdf)}>
                {pdf.premium ? (
                  <CreditCard size={16} />
                ) : (
                  <Download size={16} />
                )}
                {pdf.premium ? "Buy" : "Download"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle>Purchase PDF</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Unlock "{selectedPdf?.title}" for just {formatCurrency(9.99)}.
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
