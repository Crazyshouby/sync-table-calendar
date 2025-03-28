
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/AuthService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Lock, User } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Nom d'utilisateur requis"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface AdminLoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ open, onOpenChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await AuthService.signIn(values.username, values.password);
      if (result.success) {
        onOpenChange(false);
        navigate("/admin");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-darkblack border border-gold/30 text-cream">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-gold">Accès Administration</DialogTitle>
          <DialogDescription className="text-cream/70">
            Veuillez vous connecter pour accéder à l'interface d'administration.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-cream/50" />
                      <Input 
                        placeholder="Nom d'utilisateur" 
                        className="pl-10 bg-darkblack/50 border-gold/30 text-cream" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-cream/50" />
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-10 bg-darkblack/50 border-gold/30 text-cream" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
