using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HBLiquidArtsCollective.Pages
{
    public class HizmetlerimizModel : PageModel
    {
        private readonly ILogger<HizmetlerimizModel> _logger;

        public HizmetlerimizModel(ILogger<HizmetlerimizModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
