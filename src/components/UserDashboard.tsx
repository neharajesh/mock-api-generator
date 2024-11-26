import { useState, useEffect, useCallback } from "react";
import { Loader2, Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Generate mock data
const generateMockData = () => {
  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      age: Math.floor(Math.random() * 50) + 20,
    });
  }
  return data;
};

const BATCH_SIZE = 10;
const mockData = generateMockData();

const UserDashboard = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBatch, setCurrentBatch] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Simulate fetching data with delay
  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const start = currentBatch * BATCH_SIZE;
      const end = start + BATCH_SIZE;
      const newBatch = mockData.slice(start, end);

      setRecords((prev) => [...prev, ...newBatch]);
      setCurrentBatch((prev) => prev + 1);
      setHasMore(end < mockData.length);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentBatch]);

  useEffect(() => {
    if (currentBatch === 0) {
      fetchRecords();
    }
  }, [fetchRecords, currentBatch]);

  // Filter records based on search query
  const filteredRecords = records.filter((record) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      record.name.toLowerCase().includes(searchLower) ||
      record.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <UserCard {...record} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <Button
            onClick={fetchRecords}
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {!hasMore && records.length > 0 && (
        <div className="mt-6 text-center text-gray-500">
          No more records to load
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
