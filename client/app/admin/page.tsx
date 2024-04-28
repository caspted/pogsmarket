import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

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
    </main>
  );
}
