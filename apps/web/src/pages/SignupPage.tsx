import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import logo from "/logo.png";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const fetchData = async () => {
      console.log(formData);
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "CUSTOMER",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        console.log("error");
      } else {
        toast.success("user created successfully");
        navigate("/auth/login", { replace: true });
      }
      setLoading(false);
    };

    fetchData();
  };

  return (
    <div className="w-100 p-8 rounded-2xl bg-emerald-900">
      <div className="flex w-full justify-center">
        <img src={logo} alt="logo" className="w-13 m-3" />
      </div>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
          <Input
            id="fieldgroup-name"
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={handleChange}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
          <Input
            id="fieldgroup-password"
            placeholder="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </Field>
        <Field orientation="horizontal">
          <Button type="submit" onClick={handleSubmit}>
            {loading ? "loading..." : "sign up"}
          </Button>
        </Field>
      </FieldGroup>
    </div>
  );
}

export default SignupPage;
