const TransactionPage = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Transaction History</h3>

      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search transactions..."
            className="border p-2 rounded w-full"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>

        <div className="flex space-x-4">
          <select className="border p-2 rounded">
            <option>All Time</option>
            <option>This Month</option>
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
          </select>
          <button className="bg-gray-200 px-4 py-2 rounded">Export</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">#1234</td>
              <td className="px-6 py-4 whitespace-nowrap">John Smith</td>
              <td className="px-6 py-4 whitespace-nowrap">Mar 5, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap">$99.00</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Completed
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-600">
                View Details
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">#1233</td>
              <td className="px-6 py-4 whitespace-nowrap">Sara Johnson</td>
              <td className="px-6 py-4 whitespace-nowrap">Mar 4, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap">$49.00</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Completed
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-600">
                View Details
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">#1232</td>
              <td className="px-6 py-4 whitespace-nowrap">Mike Taylor</td>
              <td className="px-6 py-4 whitespace-nowrap">Mar 3, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap">$149.00</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-600">
                View Details
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-500">Showing 1 to 3 of 24 results</p>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded">Previous</button>
          <button className="px-3 py-1 border rounded bg-blue-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
