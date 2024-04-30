"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { priceDifference, setUserID } from "@/utils/utilFuncitons";
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

  const updateUserWallet = async (id: number | undefined, wallet: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet: wallet }),
      });
      const data = await response.json();
      setUser(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const addUserPogs = async (pogs_id: number, user_id: number | undefined) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${user_id}/pogs/${pogs_id}`, {
        method: 'POST',
      });
      const data = await response.json();
      setUserPogs(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const buyPogs = async (pogs_id: number, user_id: number | undefined, wallet: number | undefined) => {
    try {
      const selectedPog = pogs.find(pog => pog.id === pogs_id);
      if (selectedPog) {
        const newBalance = (wallet ?? 0) - selectedPog.current_price;
        addUserPogs(pogs_id, user_id);
        updateUserWallet(user_id, newBalance);
      }
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
        <Card key={user?.id} className="w-1/4 p-6 bg-slate-200">
          <CardTitle className="mb-4">Your Balance: ${user?.wallet}</CardTitle>
          <CardDescription>Welcome, {user?.name}!</CardDescription>
          <CardDescription>email: {user?.email}</CardDescription>
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
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="default">Buy</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. Payment will be taken form you wallet balance.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => buyPogs(pogs.id, user?.id, user?.wallet)}>Buy!</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
