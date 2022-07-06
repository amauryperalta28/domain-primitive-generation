using Wepsys.Core;

namespace RI.Novus.Core.Users;

///<summary>Represents User's NamesWithRegexMax</summary>
public sealed class NamesWithRegexMax : AbstractStringPrimitive
{
	/// Represents the Description minimum length restriction.
	public const int MinLength = 1;

	/// Represents the Description max length restriction.
	public const int MaxLength = 25;

	private static readonly Message ErrorMessage = new("Invalid value or format for NamesWithRegexMax");
	private static readonly StringLengthRange LengthRange = (MinLength, MaxLength).ToLengthRange();

	public const string ValidPattern = @"^((?!-))(xn--)?[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.(xn--)?([a-zA-Z0-9\-]{1,61}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,})$";

	/// <summary>
	/// Shortcut for constructor <see cref="NamesWithRegexMax"/>.
	/// <param name="namesWithRegexMax">Represents a namesWithRegexMax.</param>
	/// <returns>An instance of <see cref="NamesWithRegexMax"/></returns>
	/// </summary>
	public static NamesWithRegexMax From(string namesWithRegexMax) => new(namesWithRegexMax);
	private NamesWithRegexMax(string rawNamesWithRegexMax) : base(rawNamesWithRegexMax, LengthRange, ValidPattern, ErrorMessage)
	{
	}
}
