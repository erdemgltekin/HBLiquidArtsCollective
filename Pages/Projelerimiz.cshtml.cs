using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HBLiquidArtsCollective.Pages
{
    public class ProjelerimizModel : PageModel
    {
        private readonly ILogger<ProjelerimizModel> _logger;

        public ProjelerimizModel(ILogger<ProjelerimizModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
