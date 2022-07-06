using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's NamesWithMax
/// </summary>
public sealed class NamesWithMax : AbstractStringPrimitive
{
	/// Represents the Description minimum length restriction.
	public const int MinLength = 1;

	/// Represents the Description max length restriction.
	public const int MaxLength = 65;

	private static readonly Message ErrorMessage = new("Invalid value or format for NamesWithMax");
	private static readonly StringLengthRange LengthRange = (MinLength, MaxLength).ToLengthRange();

	/// <summary>
	/// Shortcut for constructor <see cref="NamesWithMax"/>.
	/// <param name="namesWithMax">Represents a namesWithMax.</param>
	/// <returns>An instance of <see cref="NamesWithMax"/></returns>
	/// </summary>
	public static NamesWithMax From(string namesWithMax) => new(namesWithMax);
	private NamesWithMax(string rawNamesWithMax) : base(rawNamesWithMax, LengthRange, ErrorMessage)
	{
	}
}
