using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents EntityWithAllSupportedPropertyTypesOptional's Birthday
/// </summary>
public sealed class Birthday : AbstractPastOrPresentTimestampPrimitive
{
	private Birthday(PastOrPresentTimestamp date) : base(date)
	{
	}

	/// <summary>
	/// Shortcut for constructor <see cref="Birthday"/>.
	/// <param name="rawBirthday">Represents a birthday.</param>
	/// <returns>An instance of <see cref="Birthday"/></returns>
	/// </summary>
	public static Birthday From(DateTimeOffset rawBirthday) => new(new PastOrPresentTimestamp(rawBirthday));

}
