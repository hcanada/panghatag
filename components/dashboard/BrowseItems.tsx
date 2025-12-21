import Wrapper from "../layout/Wrapper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const project = [
  {
    category: "Furniture",
    title: "Wooden dining table with four chairs",
    description:
      "Solid oak, good condition, seats four comfortably. Located in Makati",
  },
  {
    category: "Electronics",
    title: "Vintage desk lamp with brass base",
    description:
      "Works perfectly, warm light, adds character to any workspace. Quezon City",
  },
  {
    category: "Books",
    title: "Collection of fiction novels and cookbooks",
    description:
      "Thirty books total, various genres, all in readable condition. Taguig",
  },
];
export default function Browse() {
  return (
    <Wrapper className="mb-20">
      <section>
        <div className="text-center space-y-4">
          <p className="font-bold text-xs">Available</p>
          <h1 className="font-bold text-3xl">Browse free items near you</h1>
          <p>Scroll through items people are giving away in your area</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-pretty">
          {project.map((item) => (
            <Card key={item.category}>
              <CardHeader className="font-bold text-xs">
                <p> {item.category}</p>
                <CardTitle className="font-bold  text-xl">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-pretty">{item.description}</p>
              </CardContent>{" "}
              <CardFooter className="mt-auto">
                <p>View item {`>`}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </Wrapper>
  );
}
