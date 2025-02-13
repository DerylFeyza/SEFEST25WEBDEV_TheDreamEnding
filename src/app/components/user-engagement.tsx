import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UserEngagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Our Community</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Sign up for our newsletter to receive sustainability tips and
          exclusive offers.
        </p>
        <form className="flex space-x-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow"
          />
          <Button type="submit">Subscribe</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Facebook
            </Button>
            <Button variant="outline" size="sm">
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              Instagram
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
