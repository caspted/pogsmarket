import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

const invoices = [ // This is just a placeholder data
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function Home() {
  return (
    <main>
      <div className="flex overflow-hidden space-x-4">
        <div className="flex space-x-4 ml-2 animate-loop-scroll">
          <Badge variant="secondary">token1</Badge>
          <Badge variant="secondary">token2</Badge>
          <Badge variant="secondary">token3</Badge>
          <Badge variant="secondary">token4</Badge>
          <Badge variant="secondary">token5</Badge>
          <Badge variant="secondary">token6</Badge>
          <Badge variant="secondary">token7</Badge>
          <Badge variant="secondary">token8</Badge>
          <Badge variant="secondary">token9</Badge>
          <Badge variant="secondary">token10</Badge>
          <Badge variant="secondary">token11</Badge>
          <Badge variant="secondary">token12</Badge>
        </div>
        
        {/* Duplicate the items to make it look like its looping */}
        <div className="flex space-x-4 animate-loop-scroll" aria-hidden="true"> 
          <Badge variant="secondary">token1</Badge>
          <Badge variant="secondary">token2</Badge>
          <Badge variant="secondary">token3</Badge>
          <Badge variant="secondary">token4</Badge>
          <Badge variant="secondary">token5</Badge>
          <Badge variant="secondary">token6</Badge>
          <Badge variant="secondary">token7</Badge>
          <Badge variant="secondary">token8</Badge>
          <Badge variant="secondary">token9</Badge>
          <Badge variant="secondary">token10</Badge>
          <Badge variant="secondary">token11</Badge>
          <Badge variant="secondary">token12</Badge>
        </div>
      </div>

      <div className="flex justify-center mt-16 mx-12 space-x-8">
        <Card className="w-1/3 p-6 bg-slate-200">
          <CardTitle>Top Selling Pog 1</CardTitle>
          <CardContent>Content here</CardContent>
          <CardDescription>Description here</CardDescription>
          <CardFooter>Footer here</CardFooter>
        </Card>
        <Card className="w-1/3 p-6 bg-slate-200">
        <CardTitle>Top Selling Pog 2</CardTitle>
          <CardContent>Content here</CardContent>
          <CardDescription>Description here</CardDescription>
          <CardFooter>Footer here</CardFooter>
        </Card>
        <Card className="w-1/3 p-6 bg-slate-200">
        <CardTitle>Top Selling Pog 3</CardTitle>
          <CardContent>Content here</CardContent>
          <CardDescription>Description here</CardDescription>
          <CardFooter>Footer here</CardFooter>
        </Card>
      </div>

      <div className="flex-col justify-center mt-16 mx-12">
        <div>
          <h1 className="text-2xl font-bold">Market</h1>
        </div>
        <div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </main>


  );
}
