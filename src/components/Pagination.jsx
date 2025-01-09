import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import PropTypes from "prop-types";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    totalPages > 1 && (
      <div className="flex justify-center gap-2 mt-8 text-muted-foreground">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="bg-background/80 border-primary/20"
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(
            Math.max(0, currentPage - 3),
            Math.min(totalPages, currentPage + 2)
          )
          .map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "hidden sm:inline-flex",
                currentPage !== page &&
                  "bg-background/80 border-primary/20 text-muted-foreground"
              )}
            >
              {page}
            </Button>
          ))}
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="bg-background/50 border-primary/20"
        >
          Next
        </Button>
      </div>
    )
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};
