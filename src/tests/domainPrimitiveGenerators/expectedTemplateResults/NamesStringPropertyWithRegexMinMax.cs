using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's NamesWithRegexMinMax
/// </summary>
public sealed class NamesWithRegexMinMax : AbstractStringPrimitive
{
	/// Represents the Description minimum length restriction.
	public const int MinLength = 10;

	/// Represents the Description max length restriction.
	public const int MaxLength = 25;

	private static readonly Message ErrorMessage = new("Invalid value or format for NamesWithRegexMinMax");
	private static readonly StringLengthRange LengthRange = (MinLength, MaxLength).ToLengthRange();

	public const string ValidPattern = @"^((?!-))(xn--)?[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.(xn--)?([a-zA-Z0-9\-]{1,61}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,})$";

	/// <summary>
	/// Shortcut for constructor <see cref="NamesWithRegexMinMax"/>.
	/// <param name="nameswithregexminmax">Represents a nameswithregexminmax.</param>
	/// <returns>An instance of <see cref="NamesWithRegexMinMax"/></returns>
	/// </summary>
	public static readonly NamesWithRegexMinMax From(string nameswithregexminmax) => new(nameswithregexminmax);
	private NamesWithRegexMinMax(string rawNamesWithRegexMinMax) : base(rawNamesWithRegexMinMax, LengthRange, ValidPattern, ErrorMessage)
	{
	}
}
