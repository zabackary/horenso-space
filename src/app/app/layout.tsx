import "@radix-ui/themes/styles.css";

export default async function AppLayout({ children }: LayoutProps<"/app">) {
  // const supabase = await createClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // if (!session) {
  //   // redirect user to login if no session
  //   redirect("/auth/login");
  // }
  return children;
}
