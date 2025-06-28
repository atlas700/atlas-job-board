import { SelectItem } from "@/components/ui/select"
import states from "@/data/provinces.json"

export function ProvinceSelectItems() {
  return Object.entries(states).map(([abbreviation, name]) => (
    <SelectItem key={abbreviation} value={abbreviation}>
      {name}
    </SelectItem>
  ))
}
