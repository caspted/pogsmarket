import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

const pogsInMarket = [ // This is just a placeholder data
  {
    id: 1,
    name: "Apple",
    currentPrice: 1000000,
    previousPrice: 1200000,
    color: "silver",
    ticker: "AAPL"
  },
  {
    id: 2,
    name: "Alphabet Inc. (Google)",
    currentPrice: 2000000,
    previousPrice: 1900000,
    color: "red",
    ticker: "GOOG"
  },
  {
    id: 3,
    name: "Hewlett-Packard Enterprise Company",
    currentPrice: 800000,
    previousPrice: 790000,
    color: "yellow",
    ticker: "HPQ"
  },
  {
    id: 4,
    name: "Intel Corporation",
    currentPrice: 1500000,
    previousPrice: 1600000,
    color: "blue",
    ticker: "INTC"
  },
  {
    id: 5,
    name: "Berkshire Hathaway Inc.",
    currentPrice: 900000,
    previousPrice: 910000,
    color: "green",
    ticker: "BRK.A"
  },
]

const priceDifference = (currentPrice: number, previousPrice: number) => {
  let result = ((currentPrice - previousPrice) / previousPrice) * 100;
    if (result > 0) {
      return `+${result.toFixed(2) + "%"}`;
    }
  return result.toFixed(2) + "%";
}

export default function Home() {
  return (
    <main>
      <div className="flex overflow-hidden space-x-4">
        <div className="flex space-x-4 ml-2 animate-loop-scroll">
          {pogsInMarket.map((pogs) => {
            const difference = priceDifference(pogs.currentPrice, pogs.previousPrice);
            const isPositive = difference.startsWith('-') ? 'text-red-500' : 'text-green-500';

            return (
              <Badge key={pogs.id} variant="secondary" className="w-32 justify-center gap-1">
                {pogs.ticker} <span className={isPositive}>{difference}</span>
              </Badge>
            );
          })}
        </div>
        
        {/* Duplicate the items to make it look like its looping */}
        <div className="flex space-x-4 animate-loop-scroll" aria-hidden="true"> 
          {pogsInMarket.map((pogs) => {
            const difference = priceDifference(pogs.currentPrice, pogs.previousPrice);
            const isPositive = difference.startsWith('-') ? 'text-red-500' : 'text-green-500';

            return (
              <Badge key={pogs.id} variant="secondary" className="w-32 justify-center gap-1">
                {pogs.ticker} <span className={isPositive}>{difference}</span>
              </Badge>
            );
          })}
        </div>

        {/* Duplicate the items to make it look like its looping */}
        <div className="flex space-x-4 animate-loop-scroll" aria-hidden="true"> 
          {pogsInMarket.map((pogs) => {
            const difference = priceDifference(pogs.currentPrice, pogs.previousPrice);
            const isPositive = difference.startsWith('-') ? 'text-red-500' : 'text-green-500';

            return (
              <Badge key={pogs.id} variant="secondary" className="w-32 justify-center gap-1">
                {pogs.ticker} <span className={isPositive}>{difference}</span>
              </Badge>
            );
          })}
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

      <div className="flex-col justify-center mt-16 mx-40">
        <div>
          <h1 className="text-2xl font-bold mb-2">Pogs Market</h1>
        </div>
        <div>
          <Table>
            <TableCaption>A list of Pogs on the market.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-[200px]">Current Price</TableHead>
                <TableHead className="w-[200px]">Previous Price</TableHead>
                <TableHead className="w-[100px]">Color</TableHead>
                <TableHead className="w-[100px]">Ticker</TableHead>
                <TableHead className="text-right">Buy now!</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pogsInMarket.map((pogs) => (
                <TableRow key={pogs.id}>
                  <TableCell className="font-medium">{pogs.name}</TableCell>
                  <TableCell>{pogs.currentPrice}</TableCell>
                  <TableCell>{pogs.previousPrice}</TableCell>
                  <TableCell>{pogs.previousPrice}</TableCell>
                  <TableCell>{pogs.ticker}</TableCell>
                  <TableCell className="text-right">
                    <Button>Buy</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>


  );
}
