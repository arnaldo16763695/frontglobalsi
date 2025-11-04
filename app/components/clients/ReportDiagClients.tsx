import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import FormCreateReportClients from "./FormCreateReportClients";

export default function ReportDiagClients() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Printer className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generar reporte</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <FormCreateReportClients />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
