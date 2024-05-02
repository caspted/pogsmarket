import * as React from "react";
import { render } from "@testing-library/react";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "../components/ui/table";

//just Table component
describe('Table component', () => {
  test('should render without crashing', () => {
    render(
      <Table>
        <TableHeader />
        <TableBody />
        <TableFooter />
      </Table>
    );
  });

  test('should apply the right class names to Table', () => {
    const { container } = render(
      <Table >
      <TableHeader />
      <TableBody />
      <TableFooter />
    </Table>
    );
    expect(container.firstChild).toHaveClass('relative w-full overflow-auto');
  });
});


//for TableHeader component
describe('TableHeader component', () => {
  test('should render without crashing', () => {
    render(
      <Table>
        <TableHeader >
          <TableRow>
            <TableCell>Pogs Market</TableCell>
          </TableRow>
        </TableHeader >
      </Table>
    );
  });

  test('should apply the right class names to TableHeader', () => {
    const { container } = render(
      <Table>
        <TableHeader >
          <TableRow>
            <TableCell>Pogs Market</TableCell>
          </TableRow>
        </TableHeader >
      </Table>
    );
    expect(container.querySelector('thead')).toHaveClass('[&_tr]:border-b');
  });

  test('should render the contents within TableHeader', () => {
    const { getByText } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Pogs Market</TableCell>
          </TableRow>
        </TableHeader >
      </Table>
    );
    expect(getByText('Pogs Market')).toBeInTheDocument();
  });
});


//for TableBody component
describe('TableBody component', () => {
  test('should render without crashing', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Best Selling Pog</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  });

  test('should apply the right class names to TableBody', () => {
    const { container } = render(
      <Table>
        <TableBody >
          <TableRow>
            <TableCell>Best Selling Pog</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector('tbody')).toHaveClass('[&_tr:last-child]:border-0');
  });

  test('should render the contents within TableHeader', () => {
    const { getByText } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Best Selling Pog</TableCell>
          </TableRow>
        </TableBody >
      </Table>
    );
    expect(getByText('Best Selling Pog')).toBeInTheDocument();
  });
});


//for TableHead components
describe('TableHead component', () => {
  test('should render without crashing', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Highest Stock</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
  });

  test('should apply the right class names to TableHead', () => {
    const { container } = render(
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Highest Stock</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
    );
    expect(container.querySelector('th')).toHaveClass('h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0');
  });

  test('should render the contents within TableHead', () => {
    const { getByText } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Highest Stock</TableHead>
          </TableRow>
        </TableHeader >
      </Table>
    );
    expect(getByText('Highest Stock')).toBeInTheDocument();
  });
});


//for TableCell component
describe('TableCell component', () => {
  test('should render without crashing', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>PogsGiant</TableCell>
          </TableRow>
        </TableHeader>
      </Table>
    );
  });

  test('should apply the right class names to TableCell', () => {
    const { container } = render(
      <Table>
      <TableHeader>
        <TableRow>
          <TableCell>PogsGiant</TableCell>
        </TableRow>
      </TableHeader>
    </Table>
    );
    expect(container.querySelector('td')).toHaveClass('p-4 align-middle [&:has([role=checkbox])]:pr-0');
  });

  test('should render the contents within TableCell', () => {
    const { getByText } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>PogsGiant</TableCell>
          </TableRow>
        </TableHeader >
      </Table>
    );
    expect(getByText('PogsGiant')).toBeInTheDocument();
  });
});


//for TableFooter component
describe('TableFooter component', () => {
  test('should render without crashing', () => {
    render(
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell>Pogs Market Inc.</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  });

  test('should apply the right class names to TableFooter', () => {
    const { container } = render(
      <Table>
        <TableFooter >
          <TableRow>
            <TableCell>Pogs Market Inc.</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    expect(container.querySelector('tfoot')).toHaveClass('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0');
  });

  test('should render the contents within TableFooter', () => {
    const { getByText } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Pogs Market Inc.</TableCell>
          </TableRow>
        </TableHeader >
      </Table>
    );
    expect(getByText('Pogs Market Inc.')).toBeInTheDocument();
  });
});


//for TableCaption component
describe('TableCaption component', () => {
  test('should render without crashing', () => {
    render(
      <Table>
        <TableCaption>Buy one buy all</TableCaption>
      </Table>
    );
  });

  test('should apply the right class names to TableCaption', () => {
    const { container } = render(
      <Table>
        <TableCaption />
      </Table>
    );
    expect(container.querySelector('caption')).toHaveClass('mt-4 text-sm text-muted-foreground');
  });

  test('should render the contents within TableCaption', () => {
    const { getByText } = render(
      <Table>
        <TableCaption>Buy one buy all</TableCaption>
      </Table>

    );
    expect(getByText('Buy one buy all')).toBeInTheDocument();
  });
});
