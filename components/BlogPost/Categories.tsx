import type { Category } from 'lib/sanity.queries';

type Props = {
  categories: Category[];
};

const Categories = ({ categories }: Props) => (
  <div>
    {categories &&
      categories.length > 0 &&
      categories.map((category) => (
        <h1 key={category.title}>{category.title}</h1>
      ))}
  </div>
);

export default Categories;
