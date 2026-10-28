import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import logo from "/logo.png";
import useDocumentTitle from "@/hooks/useDocumentTitle";

function LoginPage() {
  useDocumentTitle({title:"Login"})
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    setLoading(true)

    const fetchData = async () => {
      console.log(formData);
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        console.log("error");
      } else {
        console.log("setting token and user to local storage")
        console.log("data is",data)
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        console.log(JSON.stringify(data.user))
        toast.success("login success");
        navigate("/dashboard", { replace: true });
      }
      setLoading(false)
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
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={handleChange}
          />
          <Field>
            <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
            <Input
              placeholder="password"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </Field>
        </Field>
        <Field orientation="horizontal">
          <Button type="submit" onClick={handleSubmit}>
            {loading ? "loading..." : "login"}
          </Button>
        </Field>
      </FieldGroup>
    </div>
  );
}

export default LoginPage;
