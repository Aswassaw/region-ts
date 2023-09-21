import React, { useState, useEffect } from "react";
import {
  ProvinceItemInterface,
  RegencyItemInterface,
  SubdistrictItemInterface,
  WardItemInterface,
} from "../interfaces/RegionList";

interface FusionAllRegion
  extends ProvinceItemInterface,
    RegencyItemInterface,
    SubdistrictItemInterface,
    WardItemInterface {}

interface SelectListProps {
  title: string;
  data: FusionAllRegion[];
  fetchOther?: (id: string) => Promise<void> | undefined;
}

export default function SelectList(props: SelectListProps) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (selected) {
      props.fetchOther && props.fetchOther(selected);
    }
  }, [selected]);

  return (
    <React.Fragment>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => setSelected(e.target.value)}
        disabled={Boolean(!props.data.length)}
      >
        <option hidden>{props.title}</option>
        {/* loop item */}
        {props.data.map((item: FusionAllRegion) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
}
