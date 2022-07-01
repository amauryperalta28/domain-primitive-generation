using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's NamesWithMin
/// </summary>
public sealed class NamesWithMin : AbstractStringPrimitive
{
	/// Represents the Description minimum length restriction.
	public const int MinLength = 10;

	/// Represents the Description max length restriction.
	public const int MaxLength = 50;

	private static readonly Message ErrorMessage = new("Invalid value or format for NamesWithMin");
	private static readonly StringLengthRange LengthRange = (MinLength, MaxLength).ToLengthRange();

	/// <summary>
	/// Shortcut for constructor <see cref="NamesWithMin"/>.
	/// <param name="nameswithmin">Represents a nameswithmin.</param>
	/// <returns>An instance of <see cref="NamesWithMin"/></returns>
	/// </summary>
	public static readonly NamesWithMin From(string nameswithmin) => new(nameswithmin);
	private NamesWithMin(string rawNamesWithMin) : base(rawNamesWithMin, LengthRange, ErrorMessage)
	{
	}
}
