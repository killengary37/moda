import AuthForm from "@/components/AuthForm";
import {signIn} from "@/lib/auth/actions";

export default function SignUpPage() {
  return <AuthForm mode="sign-in" onSubmit={signIn}/>;
}
