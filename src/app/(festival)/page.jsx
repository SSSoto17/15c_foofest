import Button from "@/components/Button";

export default function Home() {
  return (
    <main>
      <ul className="flex gap-1.5">
        <li className="bg-forest-50 w-20 h-20"></li>
        <li className="bg-forest-100 w-20 h-20"></li>
        <li className="bg-forest-200 w-20 h-20"></li>
        <li className="bg-forest-300 w-20 h-20"></li>
        <li className="bg-forest-400 w-20 h-20"></li>
        <li className="bg-forest-500 w-20 h-20"></li>
        <li className="bg-forest-600 w-20 h-20"></li>
        <li className="bg-forest-700 w-20 h-20"></li>
        <li className="bg-forest-800 w-20 h-20"></li>
        <li className="bg-forest-900 w-20 h-20"></li>
        <li className="bg-forest-950 w-20 h-20"></li>
      </ul>
      <div className="flex flex-col gap-2 py-3">
        <div className="flex gap-2">
          <button className="rounded-sm border-2 border-forest-600 bg-forest-600 px-2 py-1 hover:bg-forest-800 hover:border-forest-800 disabled:bg-forest-800 disabled:border-forest-800 disabled:text-aztec-400">Primary - sm</button>
          <button className="rounded-sm border-2 border-aztec-400 text-aztec-400 px-2 py-1">sm Secondary - sm</button>
        </div>
        <div className="flex gap-2">
          <button className=" border-2 border-forest-600 bg-forest-600 px-6 py-3">Primary - lg</button>
          <button className=" border-2 border-aztec-400 text-aztec-400 px-6 py-3">Secondary - lg</button>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-3">
        <Button size="small" variant="primary" isDisabled={true}>
          Tester
        </Button>
        <Button size="base" variant="secondary" isDisabled={true}>
          Tester
        </Button>
      </div>
    </main>
  );
}
