using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's NamesWithRegexMin
/// </summary>
public sealed class NamesWithRegexMin : AbstractStringPrimitive
{
	/// Represents the Description minimum length restriction.
	public const int MinLength = 25;

	/// Represents the Description max length restriction.
	public const int MaxLength = 100;

	private static readonly Message ErrorMessage = new("Invalid value or format for NamesWithRegexMin");
	private static readonly StringLengthRange LengthRange = (MinLength, MaxLength).ToLengthRange();

	public const string ValidPattern = @"^((?!-))(xn--)?[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.(xn--)?([a-zA-Z0-9\-]{1,61}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,})$";

	/// <summary>
	/// Shortcut for constructor <see cref="NamesWithRegexMin"/>.
	/// <param name="nameswithregexmin">Represents a nameswithregexmin.</param>
	/// <returns>An instance of <see cref="NamesWithRegexMin"/></returns>
	/// </summary>
	public static readonly NamesWithRegexMin From(string nameswithregexmin) => new(nameswithregexmin);
	private NamesWithRegexMin(string rawNamesWithRegexMin) : base(rawNamesWithRegexMin, LengthRange, ValidPattern, ErrorMessage)
	{
	}
}
