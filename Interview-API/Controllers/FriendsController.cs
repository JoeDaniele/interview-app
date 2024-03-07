// SteamFriendsApiController.cs
using Interview_API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Test.Models;

[Route("api/[controller]")]
[ApiController]
public class SteamFriendsApiController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public SteamFriendsApiController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet("GetFriendsList")]
    [ProducesResponseType(typeof(SteamFriendsApiResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> GetFriendsList([FromQuery] string steamKey, [FromQuery] string steamId)
    {
        try
        {
            if (string.IsNullOrEmpty(steamKey) || string.IsNullOrEmpty(steamId))
            {
                return BadRequest("SteamKey and SteamID are required.");
            }

            var apiUrl = $"http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key={steamKey}&steamid={steamId}&relationship=friend";

            using (var client = _httpClientFactory.CreateClient())
            {
                var response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var steamFriendsApiResponse = JsonConvert.DeserializeObject<SteamFriendsApiResponse>(content);
                    return Ok(steamFriendsApiResponse);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "Error retrieving data from Steam API");
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
