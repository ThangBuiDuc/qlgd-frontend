"use client";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
const options = [
  { key: 1, label: "Sinh viên" },
  { key: 2, label: "Lớp môn học" },
  { key: 3, label: "Lịch trình" },
];
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const querySearchParam = searchParams.get("q");
  const typeSearchParam = parseInt(searchParams.get("type"));
  const [selected, setSelected] = useState(
    new Set([`${typeSearchParam ? `${typeSearchParam}` : "1"}`])
  );
  // const [touched, setTouched] = useState(false);
  //   const isValid = value.has("cat");
  // console.log(selected);
  const [query, setQuery] = useState(
    querySearchParam ? querySearchParam.replace("+", " ") : ""
  );
  return (
    <form className="flex gap-2 lg:gap-4">
      <Select
        errorMessage={selected.size > 0 ? "" : "Bạn cần chọn hình thức!"}
        isInvalid={selected.size > 0 ? false : true}
        variant="bordered"
        selectedKeys={selected}
        className=" lg:max-w-48"
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
      <Link
        href={`/search?${selected.size ? `type=${[...selected][0]}` : ""}${
          selected.size && query
            ? `&q=${query.replace(" ", "+")}`
            : `&q=${query.replace(" ", "+")}`
        }${
          searchParams.get("hocky") && searchParams.get("namhoc")
            ? `&hocky=${searchParams.get("hocky")}&namhoc=${searchParams.get(
                "namhoc"
              )}`
            : ""
        }`}
      >
        <Button
          className="w-fit"
          color="primary"
          // variant="bordered"
          isDisabled={selected.size === 0}
        >
          Tra cứu
        </Button>
      </Link>
    </form>
  );
};

export default Search;
