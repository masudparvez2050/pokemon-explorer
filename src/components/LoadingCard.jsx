import { Card, CardContent } from "./ui/card";

export default function LoadingCard() {
  return (
    <Card className="overflow-hidden group pokemon-card card-hover">
      <CardContent className="p-6">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <div className="w-full h-full skeleton" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-6 w-2/3 mx-auto skeleton rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full skeleton rounded" />
            <div className="h-4 w-3/4 skeleton rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
