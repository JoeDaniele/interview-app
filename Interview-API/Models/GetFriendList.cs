using Test.Models;

namespace Interview_API.Models
{
    public class SteamFriendsApiResponse
    {
        public FriendsList friendslist { get; set; }
    }
}

namespace Test.Models
{
    public class FriendsList
    {
        public Friend[] friends { get; set; }
    }
}

namespace Test.Models
{
    public class Friend
    {
        public string steamid { get; set; }
        public string relationship { get; set; }
        public int friend_since { get; set; }
    }
}

/*
 * *{
    "friendslist": {
        "friends": [
            {
                "steamid": "76561197970404255",
                "relationship": "friend",
                "friend_since": 1495764781
            },

 */