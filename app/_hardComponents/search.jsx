"use client";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
const options = [
  { key: 0, label: "Sinh viên" },
  { key: 1, label: "Lớp môn học" },
  { key: 2, label: "Lịch trình" },
];

const Search = () => {
  const [selected, setSelected] = useState(new Set(["0"]));
  // const [touched, setTouched] = useState(false);
  //   const isValid = value.has("cat");
  // console.log(selected);
  const [query, setQuery] = useState("");
  return (
    <form className="flex gap-4">
      <Select
        errorMessage={selected.size > 0 ? "" : "Bạn cần chọn hình thức!"}
        isInvalid={selected.size > 0 ? false : true}
        variant="bordered"
        selectedKeys={selected}
        className="max-w-48"
        onSelectionChange={setSelected}
        color="primary"
        // onClose={() => setTouched(true)}
      >
        {options.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
      <Input
        variant="bordered"
        placeholder="Thông tin tra cứu"
        className="max-w-xl"
        color="primary"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        className="w-fit"
        color="primary"
        // variant="bordered"
        isDisabled={selected.size === 0}
      >
        Tra cứu
      </Button>
    </form>
  );
};

export default Search;
