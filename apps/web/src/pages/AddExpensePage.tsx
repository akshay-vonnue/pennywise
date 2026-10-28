import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useExpense } from "@/hooks/useExpense";
import toast from "react-hot-toast";
import { expenseManager } from "@/hooks/useExpenseContext";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { fetchCategories } from "@/lib/categories";

const categories = fetchCategories();
console.log("categories is ", categories, typeof categories);

// :used for Mapping the selectedCategory from UI to their categoryId
// later we can either hardCode the categoryId or
// fetch from the database if it is dynamix
function categoryNameToIdResolver(name: string) {
  return categories.find((cat) => cat.name === name);
}

function AddExpensePage() {
  useDocumentTitle({ title: "Add" });
  const { setFetchDataController, counter } = expenseManager();
  const { addExpense } = useExpense();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { handleSubmit, control } = useForm<{
    title: string;
    categoryId: string;
    amount: string;
    notes: string;
  }>({
    defaultValues: {
      title: "",
      categoryId: "",
      amount: "0",
      notes: "",
    },
  });

  async function handleFormSubmit(data: {
    categoryId: string;
    title: string;
    amount: string;
    notes: string;
  }) {
    setLoading(true);
    if (!data.categoryId || !data.amount || !data.title) {
      toast.error("All fields are required");
      return;
    }
    if (data.amount === "0") {
      toast.error("invalid amount");
      return;
    }
    console.log("adding data:", data);
    const categoryId = categoryNameToIdResolver(data.categoryId)?.id;
    await addExpense({ ...data, categoryId, date });
    setFetchDataController(counter + 1);
    setLoading(false);
  }

  return (
    <div className="h-full bg-emerald-950 col-span-5 flex justify-center items-center text-white overflow-hidden">
      <div className="w-1/2 overflow-scroll scrollbar-none">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="overflow-hidden"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fieldgroup-title">title</FieldLabel>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    id="fieldgroup-title"
                    type="title"
                    {...field}
                    placeholder="give me a title"
                    className="placeholder:text-gray-500"
                  />
                )}
              />
              <div className="flex gap-4">
                <div className="flex-1/2">
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="fieldgroup-amount">
                          Amount
                        </FieldLabel>
                        <Input
                          id="fieldgroup-amount"
                          placeholder="amount"
                          type="number"
                          className="placeholder:text-gray-500"
                          {...field}
                        />
                      </Field>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Field>
                          <FieldLabel htmlFor="fieldgroup-amount">
                            Category
                          </FieldLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full max-w-48">
                              <SelectValue placeholder="select a category..." />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                {categories.map((item) => (
                                  <SelectItem key={item.name} value={item.name}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                    )}
                  />
                </div>
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-title">Select a date</FieldLabel>
              <div>
                <Calendar
                  id="fieldgroup-title"
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="roudned-lg border bg-emerald-950 w-87.5 "
                />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-note">Notes</FieldLabel>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Input
                    id="fieldgroup-note"
                    type="note"
                    {...field}
                    placeholder="Add a note"
                    className="placeholder:text-gray-500"
                  />
                )}
              />
            </Field>
            <Field orientation="horizontal">
              <Button type="submit">{loading ? "loading..." : "Add"}</Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

export default AddExpensePage;
