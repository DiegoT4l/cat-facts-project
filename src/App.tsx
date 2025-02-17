import Card from "@/components/Card.tsx";
import { useEffect, useState } from "react";
import { userType } from "@/types";
import { requestCatFacts, requestUsers } from "@/services/requests.ts";
import debounce from "@/utils/debounce.ts";

function App() {
  const [userDataWithFacts, setUserDataWithFacts] = useState<{ user: userType; fact: string }[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, facts] = await Promise.all([requestUsers(), requestCatFacts()]);

        // Designate a random fact to each user
        const userDataWithFacts = users.map((user) => ({
          user,
          fact: facts[Math.floor(Math.random() * facts.length)].fact,
        }));

        setUserDataWithFacts(userDataWithFacts);

        // Debounce the setLoading to avoid flickering
        debounce(() => setLoading(false), 200)();
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container grow mx-auto p-6">
        <div className="flex flex-col gap-4 justify-center max-w-3xl mx-auto">
          {userDataWithFacts.map(({ user, fact }, index) => (
            <Card key={`${user.name.first}:${index}`} user={user} fact={fact} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
