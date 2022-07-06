using Wepsys.Core;

namespace RI.Novus.Core.Users;

///<summary>Represents User's NamesWithRegex</summary>
public sealed class NamesWithRegex : AbstractStringPrimitive
{
	/// Represents the Description minimum length restriction.
	public const int MinLength = 1;

	/// Represents the Description max length restriction.
	public const int MaxLength = 100;

	private static readonly Message ErrorMessage = new("Invalid value or format for NamesWithRegex");
	private static readonly StringLengthRange LengthRange = (MinLength, MaxLength).ToLengthRange();

	public const string ValidPattern = @"^((?!-))(xn--)?[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.(xn--)?([a-zA-Z0-9\-]{1,61}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,})$";

	/// <summary>
	/// Shortcut for constructor <see cref="NamesWithRegex"/>.
	/// <param name="namesWithRegex">Represents a namesWithRegex.</param>
	/// <returns>An instance of <see cref="NamesWithRegex"/></returns>
	/// </summary>
	public static NamesWithRegex From(string namesWithRegex) => new(namesWithRegex);
	private NamesWithRegex(string rawNamesWithRegex) : base(rawNamesWithRegex, LengthRange, ValidPattern, ErrorMessage)
	{
	}
}
