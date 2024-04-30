"use client";
import PogsForm from "@/components/PogsForm";
import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { priceDifference, setUserID } from "@/utils/utilFuncitons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Pogs, Users, UserPogs } from "@/utils/types";


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

  useEffect(() => {
    getAllPogs();
    getUser(setUserID);
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
        <div className="w-2/3">
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
                  <TableHead className="">Edit Pogs</TableHead>
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
                        <Button asChild>
                          <Link href={`/admin/pogs/${pogs.id}`}>Edit</Link>
                        </Button>
                      </TableCell>
                      <TableCell className="">
                        <Button variant="destructive">Delete</Button>
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
