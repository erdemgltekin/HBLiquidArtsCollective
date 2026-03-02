using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HBLiquidArtsCollective.Pages
{
    public class GaleriModel : PageModel
    {
        private readonly ILogger<GaleriModel> _logger;

        public GaleriModel(ILogger<GaleriModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
