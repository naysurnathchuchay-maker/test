interface Greeting {
  name: string;
  course: string;
}
const greeting: Greeting = {
  name: "nick Developer",
  course: "Software Developer Upskill/Reskill 2569",
};
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-gray-900">
        สวัสดี {greeting.name}
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        {greeting.course}
      </p>
    </main>
  );
}
