const DashboardPage = () => {
  return (
    <>

      dashboard

    </>
  );
};

export default DashboardPage;


// import Link from "next/link";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";

{/* <Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer> */}

// <div className="flex min-h-screen w-full">
//   <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
//     <div className="flex h-full max-h-screen flex-col gap-2">
//       <div className="flex h-[60px] items-center border-b px-6">
//         <Link className="flex items-center gap-2 font-semibold" href="#">
//           {/* <MegaphoneIcon className="h-6 w-6" /> */}
//           <span>Central Sync Hub</span>
//         </Link>
//       </div>
//       <div className="flex-1 overflow-auto py-2">
//         <nav className="grid items-start px-4 text-sm font-medium">
//           <Link
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//             href="#"
//           >
//             {/* <HomeIcon className="h-4 w-4" /> */}
//             Dashboard
//           </Link>
//           <Link
//             className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
//             href="#"
//           >
//             {/* <MegaphoneIcon className="h-4 w-4" /> */}
//             Publish
//           </Link>
//           <Link
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//             href="#"
//           >
//             {/* <UsersIcon className="h-4 w-4" /> */}
//             Subscribers
//           </Link>
//           <Link
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//             href="#"
//           >
//             {/* <ReplyIcon className="h-4 w-4" /> */}
//             Feedback
//           </Link>
//           <Link
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//             href="#"
//           >
//             {/* <SettingsIcon className="h-4 w-4" /> */}
//             Settings
//           </Link>
//         </nav>
//       </div>
//       <div className="mt-auto p-4">
//         <Card>
//           <CardHeader className="pb-4">
//             <CardTitle>Upgrade to Pro</CardTitle>
//             <CardDescription>Unlock all features and get unlimited access to our support team</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button className="w-full" size="sm">
//               Upgrade
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   </div>
//   <div className="flex flex-col">
//     <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
//       <Link className="lg:hidden" href="#">
//         <MegaphoneIcon className="h-6 w-6" />
//         <span className="sr-only">Home</span>
//       </Link>
//       <div className="w-full flex-1">
//         <form>
//           <div className="relative">
//             <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
//             <Input
//               className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
//               placeholder="Search publishers..."
//               type="search"
//             />
//           </div>
//         </form>
//       </div>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
//             size="icon"
//             variant="ghost"
//           >
//             <img
//               alt="Avatar"
//               className="rounded-full"
//               height="32"
//               src="/placeholder.svg"
//               style={{
//                 aspectRatio: "32/32",
//                 objectFit: "cover",
//               }}
//               width="32"
//             />
//             <span className="sr-only">Toggle user menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>My Account</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>Settings</DropdownMenuItem>
//           <DropdownMenuItem>Support</DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>Logout</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </header>
//     <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
//       <div className="flex items-center">
//         <h1 className="font-semibold text-lg md:text-2xl">Publish</h1>
//         <Button className="ml-auto" size="sm">
//           New Post
//         </Button>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <Card>
//           <CardHeader>
//             <div className="flex items-center gap-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
//                 <AvatarFallback>JP</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-0.5 text-sm">
//                 <div className="font-medium">Jared Palmer</div>
//                 <div className="text-gray-500 dark:text-gray-400">@jaredpalmer</div>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4">
//               <img
//                 alt="Publisher Image"
//                 className="aspect-video rounded-lg object-cover"
//                 height={400}
//                 src="/placeholder.svg"
//                 width={600}
//               />
//               <div className="grid gap-2">
//                 <h3 className="font-semibold text-lg">Introducing the Publish Hub</h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   A platform for publishers and subscribers to connect and engage.
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Button size="icon" variant="ghost">
//                 <HeartIcon className="h-4 w-4" />
//                 <span className="sr-only">Like</span>
//               </Button>
//               <Button size="icon" variant="ghost">
//                 <MessageCircleIcon className="h-4 w-4" />
//                 <span className="sr-only">Comment</span>
//               </Button>
//               <Button size="icon" variant="ghost">
//                 <ShareIcon className="h-4 w-4" />
//                 <span className="sr-only">Share</span>
//               </Button>
//             </div>
//             <div className="text-sm text-gray-500 dark:text-gray-400">2 days ago</div>
//           </CardFooter>
//         </Card>
//         <Card>
//           <CardHeader>
//             <div className="flex items-center gap-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
//                 <AvatarFallback>AC</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-0.5 text-sm">
//                 <div className="font-medium">Alison Carter</div>
//                 <div className="text-gray-500 dark:text-gray-400">@alisoncarter</div>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4">
//               <img
//                 alt="Publisher Image"
//                 className="aspect-video rounded-lg object-cover"
//                 height={400}
//                 src="/placeholder.svg"
//                 width={600}
//               />
//               <div className="grid gap-2">
//                 <h3 className="font-semibold text-lg">Mastering the Art of Storytelling</h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   Learn how to craft captivating narratives that engage your audience.
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Button size="icon" variant="ghost">
//                 <HeartIcon className="h-4 w-4" />
//                 <span className="sr-only">Like</span>
//               </Button>
//               <Button size="icon" variant="ghost">
//                 <MessageCircleIcon className="h-4 w-4" />
//                 <span className="sr-only">Comment</span>
//               </Button>
//               <Button size="icon" variant="ghost">
//                 <ShareIcon className="h-4 w-4" />
//                 <span className="sr-only">Share</span>
//               </Button>
//             </div>
//             <div className="text-sm text-gray-500 dark:text-gray-400">1 week ago</div>
//           </CardFooter>
//         </Card>
//         <Card>
//           <CardHeader>
//             <div className="flex items-center gap-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
//                 <AvatarFallback>MJ</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-0.5 text-sm">
//                 <div className="font-medium">Michael Johnson</div>
//                 <div className="text-gray-500 dark:text-gray-400">@michaeljohnson</div>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4">
//               <img
//                 alt="Publisher Image"
//                 className="aspect-video rounded-lg object-cover"
//                 height={400}
//                 src="/placeholder.svg"
//                 width={600}
//               />
//               <div className="grid gap-2">
//                 <h3 className="font-semibold text-lg">Unlocking the Power of Audio Content</h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   Discover how to create engaging audio content that resonates with your audience.
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Button size="icon" variant="ghost">
//                 <HeartIcon className="h-4 w-4" />
//                 <span className="sr-only">Like</span>
//               </Button>
//               <Button size="icon" variant="ghost">
//                 <MessageCircleIcon className="h-4 w-4" />
//                 <span className="sr-only">Comment</span>
//               </Button>
//               <Button size="icon" variant="ghost">
//                 <ShareIcon className="h-4 w-4" />
//                 <span className="sr-only">Share</span>
//               </Button>
//             </div>
//             <div className="text-sm text-gray-500 dark:text-gray-400">3 days ago</div>
//           </CardFooter>
//         </Card>
//       </div>
//     </main>
//   </div>
// </div>