using Wepsys.Core;

namespace RI.Novus.Core.Users;

///<summary>Represents User's NamesWithRegexMinMax</summary>
public sealed class NamesWithRegexMinMax : AbstractStringPrimitive
{
	/// Represents the Description minimum length restriction.
	public const int MinLength = 10;

	/// Represents the Description max length restriction.
	public const int MaxLength = 25;

	private static readonly Message ErrorMessage = new("Invalid value or format for NamesWithRegexMinMax");
	private static readonly StringLengthRange LengthRange = (MinLength, MaxLength).ToLengthRange();

	private readonly string ValidPattern = @"^((?!-))(xn--)?[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.(xn--)?([a-zA-Z0-9\-]{1,61}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,})$";

	/// <summary>
	/// Shortcut for constructor <see cref="NamesWithRegexMinMax"/>.
	/// <param name="namesWithRegexMinMax">Represents a namesWithRegexMinMax.</param>
	/// <returns>An instance of <see cref="NamesWithRegexMinMax"/></returns>
	/// </summary>
	public static NamesWithRegexMinMax From(string namesWithRegexMinMax) => new(namesWithRegexMinMax);
	private NamesWithRegexMinMax(string rawNamesWithRegexMinMax) : base(rawNamesWithRegexMinMax, LengthRange, ValidPattern, ErrorMessage)
	{
	}
}
