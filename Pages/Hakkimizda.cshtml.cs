using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HBLiquidArtsCollective.Pages
{
    public class HakkimizdaModel : PageModel
    {
        private readonly ILogger<HakkimizdaModel> _logger;

        public HakkimizdaModel(ILogger<HakkimizdaModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
