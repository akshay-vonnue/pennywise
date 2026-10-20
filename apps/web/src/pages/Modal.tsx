import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExpense } from "@/hooks/useExpense";
import { expenseManager } from "@/hooks/useExpenseContext";
import { Category, Expense } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

function Modal({
  expense,
  setModalOpen,
}: {
  expense: Expense;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setFetchDataController, counter } = expenseManager();
  const { updateExpense } = useExpense();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(expense.date);

  const categories: Category[] = JSON.parse(
    localStorage.getItem("categories") as string,
  );
  console.log("categories is ", categories, typeof categories);

  // :used for Mapping the selectedCategory from UI to their categoryId
  // later we can either hardCode the categoryId or
  // fetch from the database if it is dynamix
  function categoryNameToIdResolver(name: string) {
    return categories.find((cat) => cat.name === name);
  }

  function categoryIdToNameResolver(id: string) {
    return categories.find((cat) => cat.id === id);
  }

  const { handleSubmit, control } = useForm<{
    title: string;
    categoryName: string;
    amount: string;
    notes: string;
  }>({
    defaultValues: {
      title: expense.title,
      categoryName: categoryIdToNameResolver(expense.categoryId)?.name,
      amount: expense.amount,
      notes: expense.notes,
    },
  });

  async function handleFormSubmit(data: {
    categoryName: string;
    title: string;
    amount: string;
    notes: string;
  }) {
    setLoading(true);
    if (!data.categoryName || !data.amount || !data.title) {
      toast.error("All fields are required");
      return;
    }
    if (data.amount === "0") {
      toast.error("invalid amount");
      return;
    }
    const category = categoryNameToIdResolver(data.categoryName);
    if (!category) throw new Error("category not found");

    console.log("data is :", {
      title: data.title,
      amount: data.amount,
      categoryId: data.categoryName,
      date: date,
      notes: data.notes,
    });
    await updateExpense(expense.id, {
      title: data.title,
      amount: data.amount,
      categoryId: category.id,
      date: date,
      notes: data.notes,
    });
    setFetchDataController(counter + 1);
    setModalOpen(false);
    setLoading(false);
  }

  return (
    <div className="w-full h-screenbg-emerald-950 col-span-5 flex justify-center items-center text-white ">
      <div className="w-1/2">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="fieldgroup-amount">Amount</FieldLabel>
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
              <Controller
                name="categoryName"
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
                            {categories.map((category) => (
                              <SelectItem
                                key={category.name}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                )}
              />
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

export default Modal;
