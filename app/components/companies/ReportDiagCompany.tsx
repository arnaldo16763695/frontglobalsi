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
import FormCreateReportCompany from "./FormCreateReportCompany";

export default function ReportDiagCompany() {
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
        <FormCreateReportCompany/>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
