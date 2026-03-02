using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HBLiquidArtsCollective.Pages
{
    public class DanismanliklarModel : PageModel
    {
        private readonly ILogger<DanismanliklarModel> _logger;

        public DanismanliklarModel(ILogger<DanismanliklarModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
