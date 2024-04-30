'use client';
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
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


export default function UserID() {

  const [pogs, setPogs] = useState<Pogs[]>([]);
  const [user, setUser] = useState<Users>();
  const [userPogs, setUserPogs] = useState<UserPogs[]>([]);

  const getPogs = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/pogs/${id}`);
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

  const getUserPogs = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${id}/pogs`);
      const data = await response.json();
      setUserPogs(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const removeUserPogs = async (pogs_id: number, user_id: number | undefined) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${user_id}/pogs/${pogs_id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setUserPogs(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const sellPogs = async (pogs_id: number, user_id: number | undefined, wallet: number | undefined) => {
    try {
      const selectedPog = pogs.find(pog => pog.id === pogs_id);
      if (selectedPog) {
        const newBalance = (wallet ?? 0) + selectedPog.current_price;
        removeUserPogs(pogs_id, user_id);
        updateUserWallet(user_id, newBalance);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserPogs(setUserID);
    getPogs(userPogs?.[0]?.id ?? 0); // Updated code to access the id property of the first element in the userPogs array
    getUser(setUserID);
  }, [userPogs]); // Updated code to include 'userPogs' in the dependency array

  return <div>
    <div className="flex justify-center mt-16 mx-12 space-x-8">
        <Card key={user?.id} className="w-1/4 p-6 bg-slate-200">
          <CardTitle className="mb-4">Your Balance: ${user?.wallet}</CardTitle>
          <CardDescription>Welcome, {user?.name}!</CardDescription>
          <CardDescription>email: {user?.email}</CardDescription>
        </Card>
    </div>
    <div className="flex justify-center ml-8 mt-8">
      <Card className="w-2/3 p-4">
        <CardTitle className="text-xl font-bold mb-4">
          Your owned Pogs
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
              <TableHead className="">Sell this Pog</TableHead>
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
                            <Button variant="destructive">Sell</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. Payment will be added to your wallet balance.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Sell!</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
        </Table>
      </Card>
    </div>
  </div>
}