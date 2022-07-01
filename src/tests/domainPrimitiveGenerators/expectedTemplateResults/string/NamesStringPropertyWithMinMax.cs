using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's NamesWithMinMax
/// </summary>
public sealed class NamesWithMinMax : AbstractStringPrimitive
{
	/// Represents the Description minimum length restriction.
	public const int MinLength = 15;

	/// Represents the Description max length restriction.
	public const int MaxLength = 65;

	private static readonly Message ErrorMessage = new("Invalid value or format for NamesWithMinMax");
	private static readonly StringLengthRange LengthRange = (MinLength, MaxLength).ToLengthRange();

	/// <summary>
	/// Shortcut for constructor <see cref="NamesWithMinMax"/>.
	/// <param name="nameswithminmax">Represents a nameswithminmax.</param>
	/// <returns>An instance of <see cref="NamesWithMinMax"/></returns>
	/// </summary>
	public static readonly NamesWithMinMax From(string nameswithminmax) => new(nameswithminmax);
	private NamesWithMinMax(string rawNamesWithMinMax) : base(rawNamesWithMinMax, LengthRange, ErrorMessage)
	{
	}
}
