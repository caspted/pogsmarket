"use client";
import PogsForm from "@/components/PogsForm";
import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { priceDifference, setUserID } from "@/utils/utilFuncitons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Pogs, Users, UserPogs } from "@/utils/types";
import { toast } from "sonner";


export default function Home() {
  const [pogs, setPogs] = useState<Pogs[]>([]);
  const [user, setUser] = useState<Users>();
  const [userPogs, setUserPogs] = useState<UserPogs[]>([]);

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

  const getUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${id}`);
      const data = await response.json();
      setUser(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const deletePogs = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/pogs/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setPogs(data.filter((delpogs: Pogs) => delpogs.id !== id));
    }
    catch (error) {
      console.error(error);
    }
  }

  const editPogs = async (id: number, newData: Pogs) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/pogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      const data = await response.json();
      setPogs(data.filter((delpogs: Pogs) => delpogs.id !== id));
    }
    catch (error) {
      console.error(error);
    }
  }

  const pogsPriceChange = async () => {
    const updatedPogs = pogs.map((pogs) => {
      const priceChange = Math.random() * 100;
      const operation = Math.random() < 0.5 ? '+' : '-';
      const newPrice = operation === '+' ? pogs.current_price + priceChange : pogs.current_price - priceChange;
      const previousPrice = pogs.current_price;
      return {
        ...pogs,
        current_price: Number(newPrice.toFixed(2)),
        previous_price: previousPrice,
      };
    });

    const updatePromises = updatedPogs.map((pog) => editPogs(pog.id, pog));
    await Promise.all(updatePromises);

    setPogs(updatedPogs);
  };

  useEffect(() => {
    getUser(setUserID);
    getAllPogs();

    const intervalId = setInterval(() => {
      getAllPogs();
    }, 1000); // Fetch new data every 1 second
  
    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      <div className="ml-12 mt-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex flex-row mt-12 mx-12 space-x-12">
        <div className="w-1/3">
          <PogsForm/>
        </div>
        <div className="flex flex-col items-center w-2/3">
          <div className="mb-8">
            <Button variant="default" onClick={() => {
              toast("Pogs prices have been changed", {
                description: "Wait a moment for the list to reload.",
              })
              pogsPriceChange()}
            }>
              Trigger Price Change
            </Button>
          </div>
          <Card className="w-full p-4">
            <CardTitle className="text-xl font-bold mb-4">
              Listed Pogs
            </CardTitle>
            <Table>
              <TableCaption>A list of Pogs on the market.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="">Current Price</TableHead>
                  <TableHead className="">Previous Price</TableHead>
                  <TableHead className="w-[100px]">% Diff</TableHead>
                  <TableHead className="">Color</TableHead>
                  <TableHead className="">Ticker</TableHead>
                  <TableHead className="">Delete Pogs</TableHead>
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
                      <TableCell className="">
                        <Button variant="destructive" onClick={() => deletePogs(pogs.id)}>Delete</Button>
                      </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </main>
  );
}
