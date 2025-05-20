import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TableType } from "@/types/chat";

interface TableSelectorProps {
  value: TableType;
  onChange: (value: TableType) => void;
}

const TableSelector = ({ value, onChange }: TableSelectorProps) => {
  const handleChange = (newValue: string) => {
    onChange(newValue as TableType);
  };

  return (
    <div className="w-full sm:w-auto">
      <div className="flex items-center">
        <Label htmlFor="table-select" className="mr-2 text-sm font-medium">
          Table:
        </Label>
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger className="w-full sm:w-[180px]" id="table-select">
            <SelectValue placeholder="Select table" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="closed_deal">Closed Deal</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="ar">Accounts Receivable</SelectItem>
              <SelectItem value="ap">Accounts Payable</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TableSelector;
