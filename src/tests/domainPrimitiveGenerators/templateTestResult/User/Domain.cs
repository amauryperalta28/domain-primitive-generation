using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's Domain
/// </summary>
public sealed class Domain : AbstractStringPrimitive
{
	/// Represents the Description minimum length restriction.
	public const int MinLength = 1;

	/// Represents the Description max length restriction.
	public const int MaxLength = 50;

	private static readonly Message ErrorMessage = new("Invalid value or format for Domain");
	private static readonly StringLengthRange LengthRange = (MinLength, MaxLength).ToLengthRange();

	public const string ValidPattern = @"^((?!-))(xn--)?[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.(xn--)?([a-zA-Z0-9\-]{1,61}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,})$";

	/// <summary>
	/// Shortcut for constructor <see cref="Domain"/>.
	/// <param name="domain">Represents a domain.</param>
	/// <returns>An instance of <see cref="Domain"/></returns>
	/// </summary>
	public static readonly Domain From(string domain) => new(domain);
	private Domain(string rawDomain) : base(rawDomain, LengthRange, ValidPattern, ErrorMessage)
	{
	}
}
