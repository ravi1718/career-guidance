import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  userType: z.enum(["student", "college"]),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "student",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password, data.userType);
      
      toast({
        title: "Login Successful",
        description: `Welcome back! You are logged in as a ${data.userType}.`,
      });

      // Redirect based on user type
      if (data.userType === 'student') {
        navigate('/dashboard');
      } else {
        navigate('/college/dashboard');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-campus-700 mb-6 text-center">Log In to Campus Compass</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex border rounded-md overflow-hidden mb-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-center ${
                form.watch("userType") === "student" 
                  ? "bg-campus-700 text-white" 
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => form.setValue("userType", "student")}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-center ${
                form.watch("userType") === "college" 
                  ? "bg-campus-700 text-white" 
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => form.setValue("userType", "college")}
            >
              College
            </button>
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="text-sm text-right">
            <Link to="/forgot-password" className="text-campus-600 hover:text-campus-700">
              Forgot Password?
            </Link>
          </div>
          
          <Button type="submit" className="w-full bg-campus-700 hover:bg-campus-800">
            Log In
          </Button>
          
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-campus-600 hover:text-campus-700 font-medium">
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
