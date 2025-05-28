namespace DatingApp.Helpers
{
    public class PaginationHeader(int currentItem, int itemsPerPage, int totalItems, int totalPages)
    {
        public int CurrentItem { get; set; } = currentItem;
        public int ItemsPerPage { get; set; } = itemsPerPage;
        public int TotalItems { get; set; } = totalItems;
        public int TotalPages { get; set; } = totalPages;
    }
}
