"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { priceDifference, setUserID } from "@/utils/utilFuncitons";
import React, { useEffect, useState } from "react";

type Pogs = {
  id: number;
  name: string;
  current_price: number;
  previous_price: number;
  color: string;
  ticker_symbol: string;
};

export default function Home() {

  const [pogs, setPogs] = useState<Pogs[]>([]);

  const getAllPogs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/pogs');
      const data = await response.json();
      setPogs(data);
    }
    catch (error) {
      console.error(error);
    }
  };

  // const getUserWallet = async (id: number) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/user/${id}`);
  //     const data = await response.json();
  //     console.log(data);
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }

  // const buyPogs = async (id: number) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/admin/pogs/${id}`, {
  //       method: 'POST',
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    getAllPogs();
  }, []);

  return (
    <main>
      <div className="flex overflow-hidden space-x-4">
        <div className="flex space-x-4 ml-2 animate-loop-scroll">
          {pogs.map((pogs) => {
            const difference = priceDifference(pogs.current_price, pogs.previous_price);
            const isPositive = difference.startsWith('-') ? 'text-red-500' : 'text-green-500';

            return (
              <Badge key={pogs.id} variant="secondary" className="w-32 justify-center gap-1">
                {pogs.ticker_symbol} <span className={isPositive}>{difference}</span>
              </Badge>
            )
          })}
        </div>
        
        {/* Duplicate the items to make it look like its looping */}
        <div className="flex space-x-4 animate-loop-scroll" aria-hidden="true"> 
          {pogs.map((pogs) => {
            const difference = priceDifference(pogs.current_price, pogs.previous_price);
            const isPositive = difference.startsWith('-') ? 'text-red-500' : 'text-green-500';

            return (
              <Badge key={pogs.id} variant="secondary" className="w-32 justify-center gap-1">
                {pogs.ticker_symbol} <span className={isPositive}>{difference}</span>
              </Badge>
            );
          })}
        </div>

        {/* Duplicate the items to make it look like its looping */}
        <div className="flex space-x-4 animate-loop-scroll" aria-hidden="true"> 
          {pogs.map((pogs) => {
            const difference = priceDifference(pogs.current_price, pogs.previous_price);
            const isPositive = difference.startsWith('-') ? 'text-red-500' : 'text-green-500';

            return (
              <Badge key={pogs.id} variant="secondary" className="w-32 justify-center gap-1">
                {pogs.ticker_symbol} <span className={isPositive}>{difference}</span>
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
                <TableHead className="w-[100px]">% Diff</TableHead>
                <TableHead className="w-[100px]">Color</TableHead>
                <TableHead className="w-[100px]">Ticker</TableHead>
                <TableHead className="text-right">Buy now!</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pogs.map((pogs) => {
                const difference = priceDifference(pogs.current_price, pogs.previous_price);
                const isPositive = difference.startsWith('-') ? 'text-red-500' : 'text-green-500';

                return (
                <TableRow key={pogs.id}>
                  <TableCell className="font-medium">{pogs.name}</TableCell>
                  <TableCell>{pogs.current_price}</TableCell>
                  <TableCell>{pogs.previous_price}</TableCell>
                  <TableCell><span className={isPositive}>{difference}</span></TableCell>
                  <TableCell>{pogs.color}</TableCell>
                  <TableCell>{pogs.ticker_symbol}</TableCell>
                  <TableCell className="text-right">
                    <Button>Buy</Button>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>


  );
}
